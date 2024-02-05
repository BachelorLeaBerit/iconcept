using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace iconcept.Migrations
{
    /// <inheritdoc />
    public partial class Trying_again : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ConceptTranslationRegion",
                columns: table => new
                {
                    ConceptTranslationsId = table.Column<int>(type: "int", nullable: false),
                    RegionsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ConceptTranslationRegion", x => new { x.ConceptTranslationsId, x.RegionsId });
                    table.ForeignKey(
                        name: "FK_ConceptTranslationRegion_ConceptTranslations_ConceptTranslationsId",
                        column: x => x.ConceptTranslationsId,
                        principalTable: "ConceptTranslations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ConceptTranslationRegion_Regions_RegionsId",
                        column: x => x.RegionsId,
                        principalTable: "Regions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ConceptTranslationRegion_RegionsId",
                table: "ConceptTranslationRegion",
                column: "RegionsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConceptTranslationRegion");
        }
    }
}
