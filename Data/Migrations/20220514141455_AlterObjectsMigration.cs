using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagementApp.Data.Migrations
{
    public partial class AlterObjectsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateIndex(
                name: "IX_Project_OwnerId",
                table: "Project",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Project_AspNetUsers_OwnerId",
                table: "Project");

            migrationBuilder.DropIndex(
                name: "IX_Project_OwnerId",
                table: "Project");

            migrationBuilder.AlterColumn<string>(
                name: "OwnerId",
                table: "Project",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProjectOwnerId",
                table: "Project",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Project_ProjectOwnerId",
                table: "Project",
                column: "ProjectOwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Project_AspNetUsers_ProjectOwnerId",
                table: "Project",
                column: "ProjectOwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
