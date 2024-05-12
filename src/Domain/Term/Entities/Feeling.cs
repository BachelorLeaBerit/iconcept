using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using src.Domain.Term.Entities;

namespace iconcept.Domain.Term;

public class Feeling : BaseEntity
{
    public int Id { get; set; }
    public string FeelingName { get; set; }
    public List<ConceptTranslation> ConceptTranslations { get; } = [];
}
