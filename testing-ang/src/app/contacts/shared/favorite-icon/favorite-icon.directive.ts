import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from "@angular/core";
import { constants } from "./favorite-icon.constants";

@Directive({
    selector: '[appFavoriteIcon]'
})
export class FavoriteIconDirective implements OnInit {

    private element: HTMLElement;
    private renderer: Renderer2;
    private _primaryColor = 'gold';
    private _starClasses: any = constants.classes;

    @Input('appFavoriteIcon') isFavorite: boolean;

    @Input() set color(primaryColorName: string) {
        if (primaryColorName) {
            this._primaryColor = primaryColorName.toLowerCase();
            this.setSolidColoredStar();
        }
    }

    constructor(element: ElementRef, renderer: Renderer2) {
        this.element = element.nativeElement;
        this.renderer = renderer;
    }

    public ngOnInit(): void {
        if (this.isFavorite) {
            this.setSolidColoredStar();
        } else {
            this.setWhiteSolidStar();
        }
    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        if (!this.isFavorite) {
            this.setBlackOutlineStar();
        }
    }

    @HostListener('mouseleave')
    public onMouseLeave(): void {
        if (!this.isFavorite) {
            this.setWhiteSolidStar();
        }
    }

    @HostListener('click')
    public onClick(): void {
        this.isFavorite = !this.isFavorite;

        if (this.isFavorite) {
            this.setSolidColoredStar();
        } else {
            this.setBlackOutlineStar();
        }
    }

    private setBlackOutlineStar() {
        this.setStarColor('black');
        this.setStarClass('outline');
    }

    private setSolidColoredStar(): void {
        this.setStarColor(this._primaryColor);
        this.setStarClass('solid');
    }

    private setWhiteSolidStar(): void {
        this.setStarColor('white');
        this.setStarClass('solid');
    }

    private setStarClass(starType: string) {
        const className: string = this.getStarClasses(starType);
        this.renderer.setAttribute(this.element, 'class', className);
    }
    
    
    private setStarColor(starType: string) {
        this.renderer.setAttribute(this.element, 'color', this.color);
    }

    private getStarClasses(starType): string {
        let classNames = '';

        switch (starType) {
            case 'solid':
                classNames = this._starClasses.SOLID_STAR;
                break;
            case 'outline':
                classNames = this._starClasses.OUTLINE_STAR;
                break;
            default:
                classNames = this._starClasses.SOLID_STAR;
        }

        return classNames;
    }
}