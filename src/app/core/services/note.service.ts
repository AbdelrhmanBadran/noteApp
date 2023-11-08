import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
HttpClient
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }

  baseUrl:string = 'https://note-sigma-black.vercel.app/api/v1/notes';
  headers:any = {
    'token' : '3b8ny__'+localStorage.getItem('uToken')
  }

  addNote(noteData:object):Observable<any>
  {
    return this.http.post(this.baseUrl , noteData , { headers : this.headers})
  }

  getAllNotes():Observable<any>
  {
    return this.http.get(this.baseUrl ,{ headers : this.headers})
  }

  updateNote(noteData:object , id:string):Observable<any>
  {
    return this.http.put(this.baseUrl + '/' + id , noteData , { headers : this.headers})
  }

  deleteNote(id:string):Observable<any>
  {
    return this.http.delete(this.baseUrl + '/' + id , { headers : this.headers})
  }

}
