using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagementApp.Data.Migrations
{
    public partial class AddInitialObjects : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_Project_AspNetUsers_OwnerId",
            //    table: "Project");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_ProjectTask_Project_ProjectId",
            //    table: "ProjectTask");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_ProjectTask_TaskType_TypeId",
            //    table: "ProjectTask");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_ProjectUser_AspNetUsers_UserId",
            //    table: "ProjectUser");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_ProjectUser_Project_ProjectId",
            //    table: "ProjectUser");

            //migrationBuilder.DropForeignKey(
            //    name: "FK_TaskType_Project_ProjectId1",
            //    table: "TaskType");

            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_TaskType",
            //    table: "TaskType");

            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_ProjectUser",
            //    table: "ProjectUser");

            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_ProjectTask",
            //    table: "ProjectTask");

            //migrationBuilder.DropPrimaryKey(
            //    name: "PK_Project",
            //    table: "Project");

            //migrationBuilder.CreateIndex(
            //    name: "IX_TaskType_ProjectId1",
            //    table: "TaskTypes",
            //    column: "");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProjectUser_UserId",
            //    table: "ProjectUsers");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProjectUser_ProjectId",
            //    table: "ProjectUsers");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProjectTask_TypeId",
            //    table: "ProjectTasks");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ProjectTask_ProjectId",
            //    table: "ProjectTasks");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Project_OwnerId",
            //    table: "Project");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskType",
                table: "TaskType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectUser",
                table: "ProjectUser",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTask",
                table: "ProjectTask",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Project",
                table: "Project",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_AspNetUsers_OwnerId",
                table: "Project",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_Project_ProjectId",
                table: "ProjectTask",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_TaskTypes_TypeId",
                table: "ProjectTask",
                column: "TypeId",
                principalTable: "TaskType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUsers_AspNetUsers_UserId",
                table: "ProjectUser",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUsers_Project_ProjectId",
                table: "ProjectUser",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskTypes_Project_ProjectId",
                table: "TaskType",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_AspNetUsers_OwnerId",
                table: "Project");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_Project_ProjectId",
                table: "ProjectTask");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_TaskTypes_TypeId",
                table: "ProjectTask");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectUsers_AspNetUsers_UserId",
                table: "ProjectUser");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectUsers_Project_ProjectId",
                table: "ProjectUser");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskTypes_Project_ProjectId",
                table: "TaskType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskTypes",
                table: "TaskType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectUsers",
                table: "ProjectUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTasks",
                table: "ProjectTask");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Project",
                table: "Project");

            migrationBuilder.RenameTable(
                name: "TaskTypes",
                newName: "TaskType");

            migrationBuilder.RenameTable(
                name: "ProjectUsers",
                newName: "ProjectUser");

            migrationBuilder.RenameTable(
                name: "ProjectTasks",
                newName: "ProjectTask");

            migrationBuilder.RenameTable(
                name: "Project",
                newName: "Project");

            migrationBuilder.RenameIndex(
                name: "IX_TaskTypes_ProjectId",
                table: "TaskType",
                newName: "IX_TaskType_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectUsers_UserId",
                table: "ProjectUser",
                newName: "IX_ProjectUser_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectUsers_ProjectId",
                table: "ProjectUser",
                newName: "IX_ProjectUser_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTasks_TypeId",
                table: "ProjectTask",
                newName: "IX_ProjectTask_TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTasks_ProjectId",
                table: "ProjectTask",
                newName: "IX_ProjectTask_ProjectId");

            migrationBuilder.RenameIndex(
                name: "IX_Project_OwnerId",
                table: "Project",
                newName: "IX_Project_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskType",
                table: "TaskType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectUser",
                table: "ProjectUser",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTask",
                table: "ProjectTask",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Project",
                table: "Project",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_AspNetUsers_OwnerId",
                table: "Project",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTask_Project_ProjectId",
                table: "ProjectTask",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTask_TaskType_TypeId",
                table: "ProjectTask",
                column: "TypeId",
                principalTable: "TaskType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUser_AspNetUsers_UserId",
                table: "ProjectUser",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectUser_Project_ProjectId",
                table: "ProjectUser",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskType_Project_ProjectId",
                table: "TaskType",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
