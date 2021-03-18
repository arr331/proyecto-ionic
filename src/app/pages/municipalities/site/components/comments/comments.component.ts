import { Component, Input, OnInit } from '@angular/core';
import { MunicipalityService } from '../../../../../services/municipality.service';
import { Storage } from '@ionic/storage';
import { Site } from '../../../../../interfaces/site';
import { Commentary } from '../../../../../interfaces/comment';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { ModalComponent } from '../../../shared/components/modal/modal.component';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'
],
})
export class CommentsComponent implements OnInit {

  @Input() sitio: Site;

  stars = ['-outline', '-outline', '-outline', '-outline', '-outline'];
  idMun: string
  comentarios = [];
  rate: number = 2;
  com : Commentary;
  region: string;
  user: any;
  activeAdd : boolean;

  constructor(private alertCtrl: AlertController, private munService: MunicipalityService, private storage: Storage,
              private modalController: ModalController) { }

  ngOnInit() {
    this.storage.get('ids').then(ids => {
      this.idMun = ids.idMun;
      this.region = ids.region;
      this.munService.getCom(this.sitio.idSite,this.idMun).valueChanges().subscribe( res =>{
        this.comentarios= res;
        console.log(res);
        this.user = JSON.parse(localStorage.getItem('user'));
        this.existCommentary();
      });
    });
    //this.stars = this.stars.map((s, i) =>  >= i ? '' : '-outline');
    /*this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.existCommentary();*/
  }

  createUpdate(comentario){
    this.com = {
      uid: this.user.uid,
      imageUser: this.user.photoURL,
      commentary: comentario.coment,
      idOpinion: comentario.id,
      nameUser: this.user.displayName,
      numStars: comentario.num
    }
    console.log(this.com);
    this.munService.saveCom(this.com.idOpinion,this.com, this.sitio.idSite, this.region, this.idMun).then(res =>{
        console.log(res);
    }), err=>{
      console.log(err);
    };
  }

  update(comentario: any){
    if(comentario.uid === this.user.uid){
      this.presentModal(comentario);
    }
  }

  delete(idOpinion:string){
    this.munService.deleteCom(idOpinion, this.sitio.idSite, this.region, this.idMun).then(res =>{
      console.log(res);
    }), err=>{
      console.log(err);
    };
  }

  existCommentary(){
    for (let com of this.comentarios){
      if(com.uid === this.user.uid){
        this.activeAdd = false;
        console.log('igual');
        break;
      }
      else{
        this.activeAdd = true;
      }
    }
  }

  async presentModal(comentarioInput?:any) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        comentario: comentarioInput
      }
    });
    modal.onDidDismiss()
      .then((data) => {
      if(data['data']){
        let comentario = data['data']; // Here's your selected user!
        comentario.id = comentarioInput ? comentarioInput.idOpinion : '';
        if(comentario.coment){
          console.log(comentario);
          this.createUpdate(comentario);
        }
      }else{
        this.delete(comentarioInput.idOpinion);
        console.log('eliminar' + comentarioInput.idOpinion);
      }
    });
    return await modal.present();
  }

}

