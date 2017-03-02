using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Cors;

namespace GreenQueen.WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class GenerosController : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/Generos/GetGeneros
        [ActionName("GetGeneros")]
        public IQueryable<Tipo> GetTipo()
        {
            return db.Tipo;
        }

        // GET: api/Generos/GetGenerosDisco/17
        [ActionName("GetGenerosDisco")]
        public IQueryable<generosDisco_Result> GetGenerosDisco(int id)
        {
            return db.generosDisco(id);
        }

        // GET: api/Generos/GetGenerosInterprete/5
        [ActionName("GetGenerosInterprete")]
        public IQueryable<generosInterprete_Result> GetGenerosInterprete(int id)
        {
            return db.generosInterprete(id);
        }

        // GET: api/Generos/5
        [ResponseType(typeof(Tipo))]
        public IHttpActionResult GetTipo(int id)
        {
            Tipo tipo = db.Tipo.Find(id);
            if (tipo == null)
            {
                return NotFound();
            }

            return Ok(tipo);
        }

        // PUT: api/Generos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipo(int id, Tipo tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipo.IdTipo)
            {
                return BadRequest();
            }

            db.Entry(tipo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Generos
        [ResponseType(typeof(Tipo))]
        public IHttpActionResult PostTipo(Tipo tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tipo.Add(tipo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TipoExists(tipo.IdTipo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tipo.IdTipo }, tipo);
        }

        // DELETE: api/Generos/5
        [ResponseType(typeof(Tipo))]
        public IHttpActionResult DeleteTipo(int id)
        {
            Tipo tipo = db.Tipo.Find(id);
            if (tipo == null)
            {
                return NotFound();
            }

            db.Tipo.Remove(tipo);
            db.SaveChanges();

            return Ok(tipo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoExists(int id)
        {
            return db.Tipo.Count(e => e.IdTipo == id) > 0;
        }
    }
}