import Messages from "./pages/Messages";

export let MessagesService = {
    urls: [
        {path: '/messages', component: Messages, exact: false}
    ]
}