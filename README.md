# Pingu

## EC2 instance launch script

```shell
#!/bin/bash
sudo yum update -y
sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
sudo yum install -y httpd
cd /var/www/html
sudo aws s3 sync s3://pingu-files/web/ ./
sudo systemctl start httpd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
. ~/.nvm/nvm.sh
nvm install node
cd /usr/
sudo mkdir pingu
cd pingu/
sudo mkdir server
cd server/
sudo aws s3 sync s3://pingu-files/server/ ./
node pingu.js
```
