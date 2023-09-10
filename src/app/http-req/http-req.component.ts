import { Component, OnInit  } from '@angular/core'
import { WeatherService } from '../services/weather.service'
import { Chart, registerables} from 'chart.js'
import { LocationService } from '../services/location.service'
import { SnackBarService } from '../services/snack-bar.service'

@Component({
  selector: 'app-http-req',
  templateUrl: './http-req.component.html',
  styleUrls: ['./http-req.component.css']
})
export class HttpReqComponent {
  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private snackBarService: SnackBarService
  ) { }

  data: any

  chart: any

  isLoadingData: boolean = false

  latitudeValue: number

  longitudeValue: number

  locationDisplayName: string

  createChart(){
    Chart.register(...registerables)

    this.chart = new Chart("MyChart", {
      type: 'line',
    data: {
      labels: this.data.hourly.time,
      datasets: [{
        label: 'Temperature',
        data: this.data.hourly.temperature_2m,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }

    })
  }

  get longitude(): number {
    return this.longitude
  }

  get latitude(): number {
    return this.latitude
  }

  ngOnInit(): void {
    this.isLoadingData = true
    this.locationService.getLocation.subscribe(
      (position: any) => {
        this.latitudeValue = position.coords.latitude
        this.longitudeValue = position.coords.longitude
        this.weatherService.getWeather().subscribe(response => {
          this.data = response
          this.createChart()
          this.isLoadingData = false
          this.locationService.getLocationName(this.latitudeValue, this.longitudeValue).subscribe(response => {
            this.locationDisplayName = response.address.town
          })
        })
      },
      (error) => {
        this.isLoadingData = false
        this.createChart()
        this.snackBarService.openSnackBar('Enter location manually', 'Ok')
      }
    )
  }
}
