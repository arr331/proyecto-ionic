import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Coordinate } from 'src/app/interfaces/coordinate';
import { MapService } from '../../services/map.service';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  coordinatesList: Coordinate[] = [];
  mapRef = null;

  constructor(private loadingCtrl: LoadingController, private mapService: MapService) { }


  ngOnInit() {
    this.mapService.getCordinates().then(data => {
      data.forEach(mun => {
        const coordinates = Object.keys(mun).map(coor => mun[coor]);
        this.coordinatesList.push(...coordinates); 
      });
    });
    this.loadMap();
  }

  async loadMap() {
    const loading = await this.loadingCtrl.create();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: { lat: 6.1383542, lng: -75.2729218 },
      zoom: 10
    });
    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      for (let mun of this.coordinatesList){
        console.log(mun);
        //mun.map(item => console.log(item));
        //this.addMaker(parseFloat(item.x), parseFloat(item.y),item.nombre);
      }
    });
  }

  private addMaker(lat: number, lng: number, title: string) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      title: title
    });
  }

}
