using Microsoft.AspNetCore.Hosting;

[assembly: HostingStartup(typeof(ManagementApp.Areas.Identity.IdentityHostingStartup))]
namespace ManagementApp.Areas.Identity
{
    public class IdentityHostingStartup : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder)
        {
            builder.ConfigureServices((context, services) => {
            });
        }
    }
}