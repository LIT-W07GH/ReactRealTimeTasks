using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ReactRealTimeTasks.Data
{
    public class TasksRepository
    {
        private readonly string _connectionString;

        public TasksRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddTask(TaskItem task)
        {
            using (var context = new TaskItemsContext(_connectionString))
            {
                context.TaskItems.Add(task);
                context.SaveChanges();
            }
        }

        public IEnumerable<TaskItem> GetActiveTasks()
        {
            using (var context = new TaskItemsContext(_connectionString))
            {
                return context.TaskItems.Include(t => t.User)
                    .Where(t => !t.IsCompleted).ToList();
            }
        }

        public void SetDoing(int taskId, int userId)
        {
            using (var context = new TaskItemsContext(_connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "UPDATE TaskItems SET HandledBy = @userId WHERE Id = @taskId",
                    new SqlParameter("@userId", userId),
                    new SqlParameter("@taskId", taskId));
            }
        }

        public void SetCompleted(int taskId)
        {
            using (var context = new TaskItemsContext(_connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "UPDATE TaskItems SET IsCompleted = 1 WHERE Id = @taskId",
                    new SqlParameter("@taskId", taskId));
            }
        }

        public TaskItem GetById(int id)
        {
            using (var context = new TaskItemsContext(_connectionString))
            {
                return context.TaskItems.Include(t => t.User).FirstOrDefault(i => i.Id == id);
            }
        }
    }
}