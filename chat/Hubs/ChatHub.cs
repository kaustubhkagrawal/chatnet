using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {

        public async Task JoinGroup(string groupName, string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Notification", $"{user} has joined the room {groupName}.");
        }

        public async Task LeaveRoom(string groupName, string user)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Notification",  $"{user} has left the room {groupName}.");
        }


        public async Task SendMessage(string user, string message, string groupName)
        {
            await Clients.Group(groupName).SendAsync("ReceiveMessage", message, user);
        }

    }
}