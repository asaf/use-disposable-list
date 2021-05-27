# use-disposable-list

A React hook for a disposable list.

```js
const [notifs, addNotif, removeNotif] = useDisposableList({
  hideDuration: 300,
  timeout: 2000,
});
```

```ts
interface NotificationsDef {
  id: string;
  show: boolean;
  details?: NotificationDef;
}

const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
  hideDuration: 300,
  timeout: 2000,
});
```

- `notifs` is a list of disposable notifications to display
