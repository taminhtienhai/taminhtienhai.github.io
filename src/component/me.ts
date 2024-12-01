import { createStore } from "@xstate/store";
import { html, render } from "lit-html";

const TAB_PANEL_ID = 'tab__route'; 

type MeStore = {
    count: number;
};


const identity = <T>(callback: (arg: T) => void) => (ctx: T) => {
    callback(ctx);
    return ctx;
}

export const MeStore = createStore({
    context: {
        count: 0,
    } as MeStore,
    on: {
        ability: identity((context) => render(AbilityPanel(context), document.getElementById(TAB_PANEL_ID)!)),
        tool: identity((context) => render(ToolPanel(context), document.getElementById(TAB_PANEL_ID)!)),
        hobby: identity((context) => render(HobbyPanel(context), document.getElementById(TAB_PANEL_ID)!)),
    },
});

// trigger re-render on update
// MeCtx.subscribe(({ context }) => {
//     const container = document.getElementById(TAB_PANEL_ID)!;
//     render(AbilityPanel(context), container);
// });

export const MeTemplate = () => html`
<section class="card card-side bg-base-100 shadow-xl">
    <figure class="w-24 rounded-sm">
        <img src="/img/avatar_20241130.png" alt="my_avatar">
    </figure>
    <aside class="
    card-body max-w-fit
    hover:*:cursor-pointer *:transition">
        <span
            @click=${() => MeStore.send({type: 'ability'})} data-target="ability"  data-value="ability-tab"
            class="iconify jam--sword-f text-red-200 hover:bg-red-400" ></span>
        <span
            @click=${() => MeStore.send({type: 'tool'})} 
            class="iconify jam--shield-f text-gray-400 hover:bg-gray-600"></span>
        <span
            @click=${() => MeStore.send({type: 'hobby'})}
            class="iconify jam--heart-f text-green-200 hover:bg-green-400"></span>
    </aside>
    <aside id="${TAB_PANEL_ID}" class="card-body">
        <p>Introduction</p>
    </aside>
</section>
`;

export const AbilityPanel = ({ count }: MeStore) => html`
<p>My Abilities ${count}</p>
`;
export const ToolPanel = ({ count }: MeStore) => html`
<p>My Tools ${count}</p>
`;
export const HobbyPanel = ({ count }: MeStore) => html`
<p>My Hobbies ${count}</p>
`;