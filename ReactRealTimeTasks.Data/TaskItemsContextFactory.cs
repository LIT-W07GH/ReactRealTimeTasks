using System.IO;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ReactRealTimeTasks.Data
{
    public class TaskItemsContextFactory : IDesignTimeDbContextFactory<TaskItemsContext>
    {
        public TaskItemsContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactRealTimeTasks.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new TaskItemsContext(config.GetConnectionString("ConStr"));
        }
    }
}