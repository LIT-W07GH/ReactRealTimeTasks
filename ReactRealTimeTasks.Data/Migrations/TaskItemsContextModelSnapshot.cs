﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReactRealTimeTasks.Data;

namespace ReactRealTimeTasks.Data.Migrations
{
    [DbContext(typeof(TaskItemsContext))]
    partial class TaskItemsContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.14-servicing-32113")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ReactRealTimeTasks.Data.TaskItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("HandledBy");

                    b.Property<bool>("IsCompleted");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("HandledBy");

                    b.ToTable("TaskItems");
                });

            modelBuilder.Entity("ReactRealTimeTasks.Data.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("PasswordHash");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ReactRealTimeTasks.Data.TaskItem", b =>
                {
                    b.HasOne("ReactRealTimeTasks.Data.User", "User")
                        .WithMany("TaskItems")
                        .HasForeignKey("HandledBy");
                });
#pragma warning restore 612, 618
        }
    }
}
