import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; //Routerlink diretiva para navegaçao entre páginas
import {MatToolbarModule} from '@angular/material/toolbar'; //importação toolbar angular material
import { MatIconModule, MatIcon } from '@angular/material/icon'//para utilização de icones
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
