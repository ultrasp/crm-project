import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";


declare function IsSigWebInstalled(): any;
declare function GetSigWebVersion(): any;
declare function GetDaysUntilCertificateExpires(): any;
declare function SetDisplayXSize(v: any): any;
declare function SetDisplayYSize(v: any): any;
declare function SetTabletState(v: any, x: any, y?: any): any;
declare function SetJustifyMode(v: any): any;
declare function ClearTablet(): any;
declare function NumberOfTabletPoints(): any;
declare function SetSigCompressionMode(v: any): any;
declare function SetImageXSize(v: any): any;
declare function SetImageYSize(v: any): any;
declare function SetImagePenWidth(v: any): any;
declare function GetSigImageB64(callback: any): any;
declare function GetSigString(): any;
declare function Reset(): any;

@Component({
  selector: 'crm-sig-plus-form',
  templateUrl: 'CrmSigPlusForm.html',
  styleUrls: ['CrmSigPlusForm.css'],
})
export class CrmSigPlusForm implements OnInit, OnDestroy {
  constructor(private el: ElementRef) {

  }

  tmr!: any;
  resetIsSupported: boolean = false;
  SigWeb_1_6_4_0_IsInstalled: boolean = false;
  SigWeb_1_7_0_0_IsInstalled: boolean = false;

  @ViewChild('sigWebVrsnNote', {static: true}) sigWebVrsnNote!: ElementRef;
  @ViewChild('cnv', {static: true}) cnv!: ElementRef;
  @ViewChild('daysUntilExpElement', {static: true}) daysUntilExpElement!: ElementRef;
  @Output() signImage = new EventEmitter();
  form: FormGroup = new FormGroup({
    bioSigData: new FormControl(null, []),
    sigImgData: new FormControl(null, []),
    sigStringData: new FormControl(null, []),
    sigImageData: new FormControl(null, []),
  })

  ngOnInit(): void {
    if(IsSigWebInstalled()){
      var sigWebVer = "";
      try{
        sigWebVer = GetSigWebVersion();
      } catch(err: any){}

      if(sigWebVer != ""){
        try {
          this.SigWeb_1_7_0_0_IsInstalled = this.isSigWeb_1_7_0_0_Installed(sigWebVer);
        } catch( err : any){};
        if(this.SigWeb_1_7_0_0_IsInstalled){
          this.resetIsSupported = true;
          try{
            let daysUntilCertExpires = GetDaysUntilCertificateExpires();
            let daysUntilExpElement = this.daysUntilExpElement;
            if(daysUntilExpElement) {
              daysUntilExpElement.nativeElement.innerHTML = "SigWeb Certificate expires in " + daysUntilCertExpires + " days.";
            }
          } catch( err: any ){};
          this.sigWebVrsnNote.nativeElement.innerHTML = "SigWeb 1.7.0 installed";
        } else {
          try{
            this.SigWeb_1_6_4_0_IsInstalled = this.isSigWeb_1_6_4_0_Installed(sigWebVer);
          } catch( err: any ){};
          if(this.SigWeb_1_6_4_0_IsInstalled){
            this.resetIsSupported = true;
            let sigweb_link = document.createElement("a");
            sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
            sigweb_link.innerHTML = "https://www.topazsystems.com/software/sigweb.exe";

            this.sigWebVrsnNote.nativeElement.innerHTML = "SigWeb 1.6.4 is installed. Install the newer version of SigWeb from the following link: ";
            this.sigWebVrsnNote.nativeElement.appendChild(sigweb_link);
          } else{
            let sigweb_link = document.createElement("a");
            sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
            sigweb_link.innerHTML = "https://www.topazsystems.com/software/sigweb.exe";

            this.sigWebVrsnNote.nativeElement.innerHTML = "A newer version of SigWeb is available. Please uninstall the currently installed version of SigWeb and then install the new version of SigWeb from the following link: ";
            this.sigWebVrsnNote.nativeElement.appendChild(sigweb_link);
          }
        }
      } else{
        let sigweb_link = document.createElement("a");
        sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
        sigweb_link.innerHTML = "https://www.topazsystems.com/software/sigweb.exe";

        this.sigWebVrsnNote.nativeElement.innerHTML = "A newer version of SigWeb is available. Please uninstall the currently installed version of SigWeb and then install the new version of SigWeb from the following link: ";
        this.sigWebVrsnNote.nativeElement.appendChild(sigweb_link);
      }
    }
    else{
      alert("Unable to communicate with SigWeb. Please confirm that SigWeb is installed and running on this PC.");
    }
    this.onSign();
  }

  onSign()
  {
    if(IsSigWebInstalled()){
      let ctx = this.cnv.nativeElement.getContext('2d');
      SetDisplayXSize( 500 );
      SetDisplayYSize( 100 );
      SetTabletState(0, this.tmr);
      SetJustifyMode(0);
      ClearTablet();
      if(this.tmr == null)
      {
        this.tmr = SetTabletState(1, ctx, 50);
      }
      else
      {
        SetTabletState(0, this.tmr);
        this.tmr = null;
        this.tmr = SetTabletState(1, ctx, 50);
      }
    } else{
      alert("Unable to communicate with SigWeb. Please confirm that SigWeb is installed and running on this PC.");
    }
  }

  onClear()
  {
    ClearTablet();
  }

  onDone()
  {
    if(NumberOfTabletPoints() == 0)
    {
      alert("Please sign before continuing");
    }
    else
    {
      SetTabletState(0, this.tmr);
      SetSigCompressionMode(1);
      this.form.patchValue({
        bioSigData: GetSigString(),
        sigStringData: GetSigString(),
      })


      SetImageXSize(500);
      SetImageYSize(100);
      SetImagePenWidth(5);
      GetSigImageB64((str:string) =>{
        this.signImage.emit(str);
        this.SigImageCallback(str)});
    }
  }

  isSigWeb_1_6_4_0_Installed(sigWebVer: any){
    var minSigWebVersionResetSupport = "1.6.4.0";

    if(this.isOlderSigWebVersionInstalled(minSigWebVersionResetSupport, sigWebVer)){
      return false;
    }
    return true;
  }

  isSigWeb_1_7_0_0_Installed(sigWebVer: any) {
    let minSigWebVersionGetDaysUntilCertificateExpiresSupport = "1.7.0.0";

    if(this.isOlderSigWebVersionInstalled(minSigWebVersionGetDaysUntilCertificateExpiresSupport, sigWebVer)){
      return false;
    }
    return true;
  }

  isOlderSigWebVersionInstalled(cmprVer: any, sigWebVer: any){
    return this.isOlderVersion(cmprVer, sigWebVer);
  }

  isOlderVersion (oldVer: any, newVer: any) {
    const oldParts = oldVer.split('.')
    const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
      const a = parseInt(newParts[i]) || 0
      const b = parseInt(oldParts[i]) || 0
      if (a < b) return true
      if (a > b) return false
    }
    return false;
  }

  SigImageCallback( str: any )
  {
    this.form.patchValue({
      sigImageData: str,
    })
  }

  endDemo()
  {
    ClearTablet();
    SetTabletState(0, this.tmr);
  }

  close(){
    if(this.resetIsSupported){
      Reset();
    } else{
      this.endDemo();
    }
  }

  ngOnDestroy(): void {
    this.close();
    clearInterval(this.tmr);
  }


}
