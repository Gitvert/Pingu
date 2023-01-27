# Pingu

## Requested changes

* ~~Sort players in report match drop down~~
* ~~Print ELO change in Slack post after completed match~~
* ~~Add filters to match history page~~
* ~~Add back to main page navigation item~~
* ~~Make sure buttons on leaderboard are not hidden below table~~
* Bulk report of games
* ~~Numbers in scoreboard~~


## EC2 instance launch script for Kotlin backend

```shell
#!/bin/bash
sudo yum update -y

### Web server
sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
sudo yum install -y httpd
cd /var/www/html
sudo aws s3 sync s3://pingu-files/web/ ./
sudo systemctl start httpd

### Kotlin server
cd /usr/
sudo mkdir pingu
cd pingu/
sudo mkdir server
cd server/
sudo rpm --import https://yum.corretto.aws/corretto.key 
sudo curl -L -o /etc/yum.repos.d/corretto.repo https://yum.corretto.aws/corretto.repo
sudo yum install -y java-18-amazon-corretto-devel
sudo aws s3 sync s3://pingu-files/kotlin-server/ ./
java -jar kotlin-server-1.0.jar
```

## EC2 instance launch script for Typescript backend

```shell
#!/bin/bash
sudo yum update -y

### Web server
sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
sudo yum install -y httpd
cd /var/www/html
sudo aws s3 sync s3://pingu-files/web/ ./
sudo systemctl start httpd

### TypeScript server
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
. ~/.nvm/nvm.sh
nvm install --lts
cd /usr/
sudo mkdir pingu
cd pingu/
sudo mkdir server
cd server/
sudo aws s3 sync s3://pingu-files/server/ ./
node pingu.js
```
