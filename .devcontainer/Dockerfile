# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT=22-bullseye
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:${VARIANT}

RUN su node -c "source /usr/local/share/nvm/nvm.sh && \
  npm install -g \
  npm@7.24.1 \
  aws-cdk \
  lerna@6.6.2 \
  @vue/cli \
  wscat \
  typescript \
  && npm cache clean --force >/dev/null" 2>&1

RUN npm completion >> ~/.bashrc

ENV RUNLEVEL 1
RUN echo '#!/bin/sh' > /usr/sbin/policy-rc.d && \
  echo 'exit 0' >> /usr/sbin/policy-rc.d && \
  chmod +x /usr/sbin/policy-rc.d

# Install Docker CE CLI
RUN apt-get update \
  && curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/docker.gpg \
  && sudo chmod a+r /etc/apt/trusted.gpg.d/docker.gpg \
  && echo \ 
  "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/trusted.gpg.d/docker.gpg] \ 
  https://download.docker.com/linux/debian \ 
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list \
  && apt-get update \
  && apt list -a docker-ce | head \
  && apt-get install -y docker-ce=5:24.0.7-1~debian.11~bullseye docker-ce-cli=5:24.0.7-1~debian.11~bullseye containerd.io 

# Install Docker Compose
RUN export LATEST_COMPOSE_VERSION=$(curl -sSL "https://api.github.com/repos/docker/compose/releases/latest" | grep -o -P '(?<="tag_name": ").+(?=")') \
  && curl -sSL "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
  && chmod +x /usr/local/bin/docker-compose

# Create docker-init.sh to spin up socat
ARG NONROOT_USER=node

RUN echo -e "#!/bin/sh\n\
  sudoIf() { if [ \"\$(id -u)\" -ne 0 ]; then sudo \"\$@\"; else \"\$@\"; fi }\n\
  SOCKET_GID=\$(stat -c '%g' /var/run/docker.sock) \n\
  if [ \"${SOCKET_GID}\" != '0' ]; then\n\
  if [ \"\$(cat /etc/group | grep :\${SOCKET_GID}:)\" = '' ]; then sudoIf groupadd --gid \${SOCKET_GID} docker-host; fi \n\
  if [ \"\$(id ${NONROOT_USER} | grep -E \"groups=.*(=|,)\${SOCKET_GID}\(\")\" = '' ]; then sudoIf usermod -aG \${SOCKET_GID} ${NONROOT_USER}; fi\n\
  fi\n\
  exec \"\$@\"" > /usr/local/share/docker-init.sh \
  && chmod +x /usr/local/share/docker-init.sh

# run the installation script
RUN curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh \
  && /bin/zsh ~/.zshrc

# VS Code overrides ENTRYPOINT and CMD when executing `docker run` by default.
# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to
# the Docker socket if "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]

CMD [ "sleep", "infinity" ]
