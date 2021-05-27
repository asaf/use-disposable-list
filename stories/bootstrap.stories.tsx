import React from "react";
import useDisposableList from "../src/disposableList";
import { argsDefs } from "./helper";
import { Story, Meta } from "@storybook/react/types-6-0";
import { DemoProps } from "./unstyled.stories";
import { NotificationsDef, NotificationDef } from "./unstyled.stories";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Notifications({
  items,
  removeItem,
}: {
  items: NotificationsDef[];
  removeItem: Function;
}) {
  return (
    <div>
      {items.map(({ id, details = { level: "info" } }) => (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <div
            className={classNames(
              "alert alert-dismissible fade show",
              `${details.level === "info" && "alert-info"}`,
              `${details.level === "error" && "alert-danger"}`
            )}
            role="alert"
          >
            <strong>{details.message}</strong>
            {details.description}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              onClick={() => removeItem(id)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
}

const Demo = ({
  timeout,
  hideDuration,
}: {
  timeout: number;
  hideDuration: number;
}) => {
  const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
    hideDuration,
    timeout,
  });

  return (
    <>
      <div className="btn-group mb-5" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            addNotif({ message: "Hello", level: "info", description: "World" })
          }
        >
          Info
        </button>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() =>
            addNotif({
              message: "Oh no",
              level: "error",
              description: "Something bad happened",
            })
          }
        >
          Error
        </button>
      </div>
      <Notifications items={notifs} removeItem={removeNotif} />
    </>
  );
};

export default {
  title: "bootstrap",
  component: Demo,
  argTypes: argsDefs.argTypes,
  args: argsDefs.args,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<DemoProps> = (args) => <Demo {...args} />;

//👇 Each story then reuses that template
export const Sample = Template.bind({});
Sample.args = {};
