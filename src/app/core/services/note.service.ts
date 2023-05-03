import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }

  addNote(noteData:object):Observable<any>
  {
    return this.http.post('https://sticky-note-fe.vercel.app/addNote' , noteData)
  }
  updateNote(noteData:object):Observable<any>
  {
    return this.http.put('https://sticky-note-fe.vercel.app/updateNote' , noteData)
  }
  getAllNotes(noteData:object):Observable<any>
  {
    return this.http.post('https://sticky-note-fe.vercel.app/getUserNotes' , noteData)
  }

  deleteNote(noteData:object):Observable<any>
  {
    return this.http.delete('https://sticky-note-fe.vercel.app/deleteNote' , noteData)
  }
  


}
