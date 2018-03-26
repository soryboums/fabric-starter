#!/usr/bin/env bash

sudo yum update

#install docker
 sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-selinux \
                  docker-engine-selinux \
                  docker-engine \
                  docker-ce


sudo yum install -y yum-utils device-mapper-persistent-data  lvm2

sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install docker-ce

sudo systemctl start docker

sudo groupadd docker
sudo usermod -aG docker $USER

sudo systemctl start docker

sudo yum install epel-release -y
sudo yum install jq -y
jq --version


echo
echo "---------------------------------"
echo "Relogin to apply the user into the 'docker' group"
echo "---------------------------------"