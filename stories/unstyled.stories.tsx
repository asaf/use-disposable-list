import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import useDisposableList from "../src/disposableList";
import { NotificationDef } from "../src/types";
import { argsDefs } from "./helper";

export interface DemoProps {
  timeout: number;
  hideDuration: number;
}

interface NotificationsDef {
  id: string;
  show: boolean;
  details?: NotificationDef;
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
            marginBottom: "10px",
            backgroundColor: details.level === "error" ? "#f8d7da" : "#b6d4fe",
          }}
        >
          <div style={{ border: 1 }}>
            <p>{details.message}</p>
            <p>{details.description}</p>
          </div>
          <div style={{ marginLeft: 4, flexShrink: 0, display: "flex" }}>
            <button onClick={() => removeItem(id)}>
              <span>X</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const Demo = ({
  hideDuration,
  timeout,
}: {
  hideDuration: number;
  timeout: number;
}) => {
  const [notifs, addNotif, removeNotif] = useDisposableList<NotificationDef>({
    hideDuration,
    timeout,
  });

  return (
    <>
      <button
        onClick={() =>
          addNotif({ message: "Hello", level: "info", description: "World" })
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
      <Notifications items={notifs} removeItem={removeNotif} />
    </>
  );
};

//👇 This default export determines where your story goes in the story list
export default {
  title: "unstyled",
  component: Demo,
  argTypes: argsDefs.argTypes,
  args: argsDefs.args,
} as Meta;

//👇 We create a “template” of how args map to rendering
const Template: Story<DemoProps> = (args) => <Demo {...args} />;

//👇 Each story then reuses that template
export const Sample = Template.bind({});
Sample.args = {};
