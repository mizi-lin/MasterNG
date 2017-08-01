//our root app component
import {
    Component,
    Directive,
    ComponentFactory,
    Input,
    ReflectiveInjector,
    ViewContainerRef,

} from '@angular/core'
import {ComponentMetadata} from 'codelyzer/angular/metadata';

export function createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponent {};
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Directive({
    selector: 'dynamic-html-outlet',
})
export class DynamicHTMLOutlet {
    @Input() src: string;

    constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
    }

    ngOnChanges() {
        if (!this.src) return;

        const metadata = new ComponentMetadata({
            selector: 'dynamic-html',
            template: this.src,
        });
        createComponentFactory(this.resolver, metadata)
        .then(factory => {
            const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
            this.vcRef.createComponent(factory, 0, injector, []);
        });
    }
}

@Component({
    selector: 'my-app',
    template: `
        <dynamic-html-outlet [src]="html"></dynamic-html-outlet>
    `,
    directives: [DynamicHTMLOutlet]
})
export class App {
    html = `<div>
    <p>Dynamic HTML Fragment</p>
</div>`;
}