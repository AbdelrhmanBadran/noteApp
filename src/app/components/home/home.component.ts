import { AuthService } from 'src/app/core/services/auth.service';
import { NoteService } from 'src/app/core/services/note.service';
import { Component , Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(public dialog: MatDialog , private _NoteService:NoteService , private _AuthService:AuthService) { }

  notes:any[] = []
  emptyMsg:string = ''
  searchTerm:string = ''

  ngOnInit(): void {
    this.getNotes()
  }


  getNotes():void{
    const data = {
      token:localStorage.getItem('uToken'),
      userID:this._AuthService.userdata.getValue()._id
    }
    this._NoteService.getAllNotes().subscribe({
      next:res=>{
        console.log(res);

        if (res.msg  === 'done') {
          this.notes = res.notes
        }else{
          this.emptyMsg = res.msg
        }
      },
      error:err=>{
        console.log(err);
      }
    })
  }


  openDialog():void {
    const dialogRef = this.dialog.open(NoteDataComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'done') {
        this.getNotes()
      }
    });
  }

  setData(note:object):void{

    const dialogRef =  this.dialog.open(NoteDataComponent , {
      data:{note}
    });

    dialogRef.afterClosed().subscribe({
      next:result =>{
        if (result === 'update') {
          this.getNotes()
        }
      }
    })

  }


  delete(id:string , index:number):void{

    const noteData ={
      body:{
        NoteID:id,
        token: localStorage.getItem('uToken')!
      }
    }


    console.log(noteData);
    this.notes.splice(index ,1)
    this.notes = [...this.notes]

    this._NoteService.deleteNote(id).subscribe({
      next:res=>{
        //console.log(res);
      },
      error:err=>{
       // console.log(err);
      }
    })

  }
}

