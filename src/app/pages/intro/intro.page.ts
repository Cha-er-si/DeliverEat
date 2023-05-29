import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit, AfterViewInit {
  @ViewChild('swiper') swiperRef!: ElementRef;
  swiper?: Swiper;
  buttonLabel: string = 'SKIP';
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit() {
    setTimeout(() => {
      this.swiperRef?.nativeElement.setAttribute('navigation', 'true');
      this.swiperRef?.nativeElement.swiper.update();
    }, 100);
  }

  onSlideChange() {
    if (this.swiperRef?.nativeElement.swiper.isEnd) {
      this.buttonLabel = 'PROCEED';
    } else {
      this.buttonLabel = 'SKIP';
    }
  }

  navigation() {
    if (window.innerWidth > 991) {
      return true;
    } else {
      return false;
    }
  }
}
