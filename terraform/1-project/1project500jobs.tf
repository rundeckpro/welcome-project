terraform {
  required_providers {
    rundeck = {
      source  = "rundeck/rundeck"
      version = "0.4.3"
    }
  }
}

provider "rundeck" {
  url         = "http://localhost:4440"
  api_version = "41"
  auth_token  = "VAijiNjDvTjt9RKiGn561GJQrX2YbEcN"
}

locals {
  job_per_project = 10
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
    description       = "A test job description"
#    schedule	      = "* * * ? * * *"
    command {
        shell_command = "hostname"
    }
    
}



