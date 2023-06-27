import { component$, Slot, QwikIntrinsicElements } from '@builder.io/qwik';
import { Tab as HeadlessTab } from '@qwik-ui/headless';

export type TabProps = {
  class?: string;
  isLifted?: boolean;
  isBordered?: boolean;
  // commented out if need to refactor. failing build due to this.
  // onClick$?: PropFunction<(clicked: number) => void>;
} & QwikIntrinsicElements['button'];

export const Tab = component$(
  ({ isBordered, isLifted, ...props }: TabProps) => {
    return (
      <HeadlessTab
        onClick$={props.onClick$}
        class={`tab ${isBordered ? 'tab-bordered' : ''} ${
          isLifted ? 'tab-lifted' : ''
        }`}
        selectedClassName="tab-active"
        {...props}
      >
        <Slot />
      </HeadlessTab>
    );
  }
);
