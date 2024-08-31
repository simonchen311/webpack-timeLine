import Vue from "vue";
import HelloWorld from "@/components/HelloWorld";
import { shallowMount } from "@vue/test-utils";

describe("HelloWorld.vue", () => {
    it("should render correct contents", () => {
        const Constructor = Vue.extend(HelloWorld);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector(".hello h1").textContent)
            .toEqual("Welcome to Your Vue.js App");
    });
    it("test button ", () => {
        // 会加载子组件，不会被子组件的行为属性影响该组件
        const wrapper = shallowMount(HelloWorld, {
            propsData: {
                prop: "这是入参"
            }
        });
        const button = wrapper.find("button");
        const eco = wrapper.vm.$el.querySelector(".eco");
        expect(wrapper.vm.$el.querySelector(".propa").textContent.trim())
            .toEqual("这是入参");
        expect(eco.textContent)
            .toEqual("Ecosystem");
        button.trigger("click");
        Vue.nextTick(() => {
            expect(eco.textContent)
                .toEqual("Ecosystem-change");
        });
    });
});
