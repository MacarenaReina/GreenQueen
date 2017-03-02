using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using GreenQueen.WebAPI;
using System.Web.Http.Cors;

namespace GreenQueen.WebAPI.Controllers
{
    [EnableCors("*", "*", "*")]
    public class InterpretesController : ApiController
    {
        private DiscosEntities db = new DiscosEntities();

        // GET: api/Interpretes/GetInterpretes
        [ActionName("GetInterpretes")]
        public IQueryable<Interprete> GetInterprete()
        {
            return db.Interprete;
        }

        // GET: api/Interpretes/GetInterpretesDisco/8
        [ActionName("GetInterpretesDisco")]
        public IQueryable<interpretesDisco_Result> GetInterpretesDisco(int id)
        {
            return db.interpretesDisco(id);
        }

        // GET: api/Interpretes/GetInterpretesGenero/17
        [ActionName("GetInterpretesGenero")]
        public IQueryable<interpretesGenero_Result> GetInterpretesGenero(int id)
        {
            return db.interpretesGenero(id);
        }

        // GET: api/Interpretes/5
        [ResponseType(typeof(Interprete))]
        public IHttpActionResult GetInterprete(int id)
        {
            Interprete interprete = db.Interprete.Find(id);
            if (interprete == null)
            {
                return NotFound();
            }

            return Ok(interprete);
        }

        // PUT: api/Interpretes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInterprete(int id, Interprete interprete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != interprete.IdInterprete)
            {
                return BadRequest();
            }

            db.Entry(interprete).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InterpreteExists(id))
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

        // POST: api/Interpretes
        [ResponseType(typeof(Interprete))]
        public IHttpActionResult PostInterprete(Interprete interprete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Interprete.Add(interprete);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (InterpreteExists(interprete.IdInterprete))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = interprete.IdInterprete }, interprete);
        }

        // DELETE: api/Interpretes/5
        [ResponseType(typeof(Interprete))]
        public IHttpActionResult DeleteInterprete(int id)
        {
            Interprete interprete = db.Interprete.Find(id);
            if (interprete == null)
            {
                return NotFound();
            }

            db.Interprete.Remove(interprete);
            db.SaveChanges();

            return Ok(interprete);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InterpreteExists(int id)
        {
            return db.Interprete.Count(e => e.IdInterprete == id) > 0;
        }
    }
}