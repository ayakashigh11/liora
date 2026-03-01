#!/bin/bash
# Dependencies Management

detect_distro() {
    [ ! -f /etc/os-release ] && { error "Cannot detect operating system"; exit 1; }
    
    . /etc/os-release
    export OS_ID="$ID"
    export OS_VERSION="${VERSION_ID:-unknown}"
    
    case "$OS_ID" in
        ubuntu|debian)
            export PKG_UPDATE="apt-get update -qq"
            export PKG_INSTALL="apt-get install -y -qq"
            # Full list of Puppeteer dependencies for Debian/Ubuntu
            export DEPS="git curl wget ca-certificates unzip ffmpeg libnss3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxrandr2 libgbm1 libasound2 libpango-1.0-0 libpangocairo-1.0-0"
            ;;
        centos|rhel|rocky|alma)
            export PKG_UPDATE="yum check-update || true"
            export PKG_INSTALL="yum install -y -q"
            export DEPS="git curl wget ca-certificates unzip ffmpeg alsa-lib at-spi2-atk atk cups-libs libdrm libXcomposite libXdamage libXrandr mesa-libgbm pango cairo-gobject-devel"
            ;;
        fedora)
            export PKG_UPDATE="dnf check-update || true"
            export PKG_INSTALL="dnf install -y -q"
            export DEPS="git curl wget ca-certificates unzip ffmpeg alsa-lib at-spi2-atk atk cups-libs libdrm libXcomposite libXdamage libXrandr mesa-libgbm pango cairo-gobject-devel"
            ;;
        alpine)
            export PKG_UPDATE="apk update"
            export PKG_INSTALL="apk add"
            export DEPS="git curl wget ca-certificates unzip ffmpeg chromium nss freetype harfbuzz ttf-freefont"
            ;;
        arch)
            export PKG_UPDATE="pacman -Sy"
            export PKG_INSTALL="pacman -S --noconfirm"
            export DEPS="git curl wget ca-certificates unzip ffmpeg nss atk at-spi2-atk cups libdrm libxkbcommon libxcomposite libxdamage libxrandr gbm alsa-lib pango cairo"
            ;;
        *)
            warn "Unsupported distribution: ${YELLOW}${OS_ID}${RESET}"
            export PKG_UPDATE="true"
            export PKG_INSTALL="echo"
            export DEPS=""
            ;;
    esac
    
    log "Detected: ${CYAN}${OS_ID}${RESET} ${DIM}${OS_VERSION}${RESET}"
}

install_packages() {
    info "Installing system packages..."
    echo -e "${GRAY}────────────────────────────────────────────────────────────────────────────${RESET}"
    
    $PKG_UPDATE || true
    
    if [ -n "$DEPS" ]; then
        $PKG_INSTALL $DEPS || {
            error "Failed to install dependencies"
            exit 1
        }
    fi
    
    log "System dependencies and required libraries installed successfully."
}

install_node() {
    info "Checking Node.js version..."
    
    local node_ver=$(node -v 2>/dev/null | sed 's/v//' | cut -d. -f1 || echo "0")
    
    # Puppeteer requires Node >= 18
    if [ "$node_ver" -ge 18 ]; then
        log "Node.js is already up to date: ${CYAN}v$(node -v)${RESET}"
        return 0
    fi

    info "Node.js is missing or outdated ($node_ver). Installing Node.js LTS..."
    
    case "$OS_ID" in
        ubuntu|debian)
            # Use Node 20 for newer releases, 18 for older ones if needed
            local setup_ver="20.x"
            # Example: Ubuntu 18.04 might prefer 18.x
            [[ "$OS_VERSION" == "18.04" ]] && setup_ver="18.x"
            
            curl -fsSL https://deb.nodesource.com/setup_$setup_ver | bash -
            apt-get install -y nodejs
            ;;
        centos|rhel|rocky|alma|fedora)
            local setup_ver="20.x"
            curl -fsSL https://rpm.nodesource.com/setup_$setup_ver | bash -
            ${PKG_INSTALL% *} install -y nodejs
            ;;
        alpine)
            apk add nodejs npm
            ;;
        arch)
            pacman -S --noconfirm nodejs npm
            ;;
        *)
            warn "Manual Node.js installation required for ${YELLOW}${OS_ID}${RESET}."
            ;;
    esac

    if ! command -v node &> /dev/null; then
        error "Node.js installation failed."
        exit 1
    fi
    log "Node.js ready: ${CYAN}v$(node -v)${RESET}"
}

install_bun() {
    info "Checking Bun runtime..."
    echo -e "${GRAY}────────────────────────────────────────────────────────────────────────────${RESET}"
    
    if [ -d "$HOME/.bun" ]; then
        info "Bun already installed, upgrading to latest version..."
        export BUN_INSTALL="$HOME/.bun"
        export PATH="$BUN_INSTALL/bin:$PATH"
        "$BUN_PATH" upgrade 2>/dev/null || true
    else
        info "Installing Bun runtime..."
        curl -fsSL https://bun.sh/install | bash || {
            error "Failed to install Bun"
            exit 1
        }
        export BUN_INSTALL="$HOME/.bun"
        export PATH="$BUN_INSTALL/bin:$PATH"
    fi
    
    if [ ! -f "$BUN_PATH" ]; then
        error "Bun binary not found at ${YELLOW}${BUN_PATH}${RESET}"
        exit 1
    fi
    
    if ! "$BUN_PATH" --version &>/dev/null; then
        error "Bun installation verification failed"
        exit 1
    fi
    
    export BUN_VERSION=$("$BUN_PATH" --version)
    log "Bun runtime ready: ${CYAN}v${BUN_VERSION}${RESET}"
}

install_dependencies() {
    echo ""
    echo -e "${BOLD}${CYAN} ✦ System Dependencies ✦ ${RESET}"
    echo -e "${GRAY}────────────────────────────────────────────────────────────${RESET}"
    echo -e "${DIM}Install required packages and runtime.${RESET}"
    echo ""

    detect_distro
    echo ""
    install_node
    echo ""
    install_packages
    echo ""
    install_bun
    echo ""
}