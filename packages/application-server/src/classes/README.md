# How does this work

There are two main classes here: BasicActions and RendererListeners.
The whole point of these classes is to help abstract away the idea of ipcRenderer and ipcMain and instead let the developer purely focus on the inputs and outputs.
This works in two ways, one where the renderer process (i.e. React) wants to send some signal to the main process (i.e. Electron) and one where the renderer process needs some data back from the main process.

## Renderer sending a signal to Main

First instantiate a BasicAction giving it some type T. The first argument is what unique channel will the main process listen on and the second argument is the callback, what will the main process do when it receives this action.

Then when the renderer process wants to call on this action, it can just call on BasicAction.sendAction(T) and the callback will be invoked. Be sure to add this new action to the actions.ts file under src, adding both the action to RENDERER_ACTIONS and the listener to MAIN_LISTENERS.

Presto, now the renderer process can communicate with the main process. This is useful in example like stopping the internet ping, or changing some user prefences by writing to a looking-glass.config.json file, etc.

## Renderer getting data back from Main

Next, we often need to receive data back from the main process in the renderer process, this is where the RendererListener class comes into play. When a BasicAction callback gets invoked, it can respond back to the renderer thread using event.sender.send({}). We take advantage of this and provide some stronger typing around this event using RendererListener.

Instantiate a new RendererListener of type T with a unique channel name, then use the RendererListener in the callback of a BasicAction. Generally we use event.sender.send(RendererListener.channel, RendererListener.verifyArgs(T)) to respond back to the renderer process. The verifyArgs method is simply to ensure all the typings are respected.

## General notes

Be sure to add your actions and listeners correctly in the src/actions.ts file in this repo. In order to configure the renderer listener response, you can head to @looking-glass/interface#store#listener#instantiateRendererListeners, where you can add a new action with its according redux dispatch.
