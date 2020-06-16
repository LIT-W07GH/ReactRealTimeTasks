using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace ReactRealTimeTasks.Data
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public List<TaskItem> TaskItems { get; set; }
    }
}
