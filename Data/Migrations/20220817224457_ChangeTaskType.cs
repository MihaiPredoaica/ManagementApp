using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagementApp.Data.Migrations
{
    public partial class ChangeTaskType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Layer",
                table: "TaskType");

            migrationBuilder.AddColumn<int>(
                name: "Icon",
                table: "TaskType",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TaskType",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Layer",
                table: "ProjectTask",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "TaskType");

            migrationBuilder.DropColumn(
                name: "Layer",
                table: "ProjectTask");

            migrationBuilder.RenameColumn(
                name: "Icon",
                table: "TaskType",
                newName: "Layer");
        }
    }
}
