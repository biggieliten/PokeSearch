using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
var app = builder.Build();

HttpClient httpClient = new HttpClient();

app.UseCors(policy => policy.AllowAnyOrigin());

async Task<IResult> GetPokemon(string identifier)
{
	try
	{
		var response = await httpClient.GetAsync($"https://pokeapi.co/api/v2/pokemon/{identifier}");

		if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
		{
			return Results.NotFound(new { error = $"Pokémon '{identifier}' not found" });
		}

		var content = await response.Content.ReadFromJsonAsync<PokemonResponse>();
		return Results.Ok(new
		{
			id = content.Id,
			name = content.Name ?? "",
			image = content.Sprites.FrontDefault
		});
	}
	catch
	{
		return Results.StatusCode(500);
	}
}

app.MapGet("/api/pokemon/{name}", async (string name) => await GetPokemon(name));

app.MapGet("/api/pokemon/{n:int}", async (int n) => await GetPokemon(n.ToString()));

app.Run();

public class PokemonResponse
{
	public int Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public Sprites Sprites { get; set; }

}

public class Sprites
{
	[JsonPropertyName("front_default")]
	public string FrontDefault { get; set; } = string.Empty;
}
