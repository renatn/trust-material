# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

    config.vm.box = "ubuntu/trusty64"
    config.vm.synced_folder ".", "/vagrant"
    config.vm.box_check_update = false

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "2048"
    end

    config.vm.define :dev do |dev|
        dev.vm.network :forwarded_port, host: 3000, guest: 3000
        dev.vm.provision "shell", path: "bootstrap.sh"
        dev.vm.provision :shell, inline: 'ansible-playbook -i "localhost," /vagrant/ansible/dev.yml -c local -v'
        dev.vm.hostname = "tol-material"
    end

end
