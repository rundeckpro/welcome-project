terraform {
  required_providers {
    rundeck = {
      source  = "rundeck/rundeck"
      version = "0.4.3"
    }
  }
}

provider "rundeck" {
#  url         = "http://192.168.1.77:4440/"
  url         = "http://localhost:4440"
  api_version = "41"
  auth_token  = "VAijiNjDvTjt9RKiGn561GJQrX2YbEcN"
}

locals {
  job_per_project = 100
}

resource "rundeck_project" "Project1" {
  name        = "Project1"
  description = "Project1"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project1"
  }
}


resource "rundeck_job" "jobP1" {
    count = local.job_per_project
    name              = "jobP1-${count.index}"
    project_name      = rundeck_project.Project1.name
#    node_filter_query = "tags: web"
    description       = "Restart the service daemons on all the web servers"
    schedule	      = "0/30 * * ? * * *"
    command {
        shell_command = "hostname"
    }
    
}


resource "rundeck_project" "Project2" {
  name        = "Project2"
  description = "Project2"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project2"
  }
}


resource "rundeck_job" "jobP2" {
    count = local.job_per_project
    name              = "jobP2-${count.index}"
    project_name      = rundeck_project.Project2.name
#    node_filter_query = "tags: web"
    description       = "Restart the service daemons on all the web servers"
    schedule	      = "0/30 * * ? * * *"
    command {
        shell_command = "hostname"
    }

}


resource "rundeck_project" "Project3" {
  name        = "Project3"
  description = "Project3"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project3"
  }
}


resource "rundeck_job" "jobP3" {
    count = local.job_per_project
    name              = "jobP3-${count.index}"
    project_name      = rundeck_project.Project3.name
#    node_filter_query = "tags: web"
    description       = "Restart the service daemons on all the web servers"
    schedule	      = "0/30 * * ? * * *"
    command {
        shell_command = "hostname"
    }

}


resource "rundeck_project" "Project4" {
  name        = "Project4"
  description = "Project4"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project4"
  }
}


resource "rundeck_job" "jobP4" {
    count = local.job_per_project
    name              = "jobP4-${count.index}"
    project_name      = rundeck_project.Project4.name
#    node_filter_query = "tags: web"
    description       = "Restart the service daemons on all the web servers"
    schedule	      = "0/15 0 * ? * * *"
    command {
        shell_command = "hostname"
    }

}


resource "rundeck_project" "Project5" {
  name        = "Project5"
  description = "Project5"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project5"
  }
}


resource "rundeck_job" "jobP5" {
    count = local.job_per_project
    name              = "jobP5-${count.index}"
    project_name      = rundeck_project.Project5.name
#    node_filter_query = "tags: web"
    description       = "Restart the service daemons on all the web servers"
    schedule	      = "0/20 * * ? * * *"
    command {
        shell_command = "hostname"
    }

}



resource "rundeck_project" "Project6" {
  name        = "Project6"
  description = "Project6"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project6"
  }
}


resource "rundeck_job" "jobP6" {
  count = local.job_per_project
  name              = "jobP6-${count.index}"
  project_name      = rundeck_project.Project6.name
  #    node_filter_query = "tags: web"
  description       = "Restart the service daemons on all the web servers"
  schedule	      = "0/10 * * ? * * *"
  command {
    shell_command = "hostname"
  }

}


resource "rundeck_project" "Project7" {
  name        = "Project7"
  description = "Project7"
  #ssh_key_storage_path = "${rundeck_private_key.terraform.path}"
  resource_model_source {
    type = "local"
    config = {
    }
  }
  extra_config = {
    "project.label" = "Project7"
  }
}


resource "rundeck_job" "jobP7" {
  count = local.job_per_project
  name              = "jobP7-${count.index}"
  project_name      = rundeck_project.Project7.name
  #    node_filter_query = "tags: web"
  description       = "Restart the service daemons on all the web servers"
  schedule	      = "0/10 * * ? * * *"
  command {
    shell_command = "hostname"
  }

}