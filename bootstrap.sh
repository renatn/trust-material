#!/bin/bash

echo "Installing Ansible..."
apt-get update
apt-get install -y python-software-properties
apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install -y ansible