# use-disposable-list

A react hook to create a list of disposable items,

It can be used as a core infra to display a growl notification for **any** css framework.

### Basic Sample

See live in [Codesandbox](https://codesandbox.io/s/clever-cache-y7xw1)

```jsx
import "./styles.css";
import useDisposableList from "use-disposable-list";

export default function App() {
  const [notifs, addNotif, removeNotif] = useDisposableList({
    hideDuration: 0,
    timeout: 2000,
  });

  return (
    <div className="App">
      <h1>use-disposable-list</h1>
      <div>
        <div style={{ paddingBottom: "20px" }}>
          <button
            onClick={() =>
              addNotif({
                message: "Hello",
                level: "info",
                description: "World",
              })
            }
          >
            info
          </button>
          <button
            onClick={() =>
              addNotif({
                message: "Oh no",
                level: "error",
                description: "Something bad happened",
              })
            }
          >
            error
          </button>
        </div>
        {notifs.map(({ id, show, details = { level: "info" } }) => (
          <div>
            <span>{details.message}</span>
            <button
              onClick={() => removeNotif(id)}
              style={{ marginLeft: "3px" }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Typescript

```tsx
export interface NotificationDef {
  message: string;
  description?: string;
  level: "info" | "error";
}

interface NotificationsDef {
  id: string;
  show: boolean;
  details?: NotificationDef;
}

const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
  hideDuration: 300,
  timeout: 2000,
});

//...
```

### Demos

- [story book](https://60afd8ceda1d8b003977ba04-bwpixgfhhi.chromatic.com/)
- [Codesandbox with Bootstrap](https://codesandbox.io/s/holy-tdd-t8gr8)
