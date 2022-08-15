import {AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild} from "@angular/core";
import { ImageCroppedEvent } from "ngx-image-cropper";

@Component({
  selector: 'crm-video-device',
  templateUrl: './CrmVideoDevice.html',
  styleUrls: ['./CrmVideoDevice.css'],
})

export class CrmVideoDevice implements OnInit,AfterViewInit  {

  constructor(private zone: NgZone) { }

  @ViewChild('player') player!: ElementRef<HTMLVideoElement>;
  // @ViewChild('capture') captureBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('snapshot') snapshotCanvas!: ElementRef<HTMLCanvasElement>;

  @Output() captureImage = new EventEmitter<Blob | null>();
  error: any;
  imageBlob:any;
  croppedImage: any = '';

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.setupDevices();
  }


  handleStream() {
      navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream: any) => {
        this.player.nativeElement = stream;
      })
      .catch(err => console.error(err));
  };

  async setupDevices() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if (stream) {
          this.player.nativeElement.srcObject = stream;
          this.player.nativeElement.play();
          this.error = null;
        } else {
          this.error = "You have no output video device";
        }
      } catch (e) {
        this.error = e;
      }
    }
  }

  captureSnapshot() {
    const _snapshot = this.snapshotCanvas.nativeElement;
    const _player = this.player.nativeElement;
    const context: CanvasRenderingContext2D | null = _snapshot.getContext('2d');
    context?.drawImage(_player, 0, 0, _snapshot.width, _snapshot.height);
    context?.canvas.toBlob((data) => {
      this.imageBlob = data;
      console.log(this.imageBlob,'this.imageBlob')
      // this.captureImage.emit(data);
    }, 'image/png');
  };

  cropperReady() {
    // cropper ready
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.captureImage.emit(this.croppedImage);
  }

}
