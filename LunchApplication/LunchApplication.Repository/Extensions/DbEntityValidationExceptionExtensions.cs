using System.Data.Entity.Validation;
using Core.Common.Implementation;

namespace LunchApplication.Repository.Extensions
{
    public static class DbEntityValidationExceptionExtensions
    {
        public static ValidationResult ToValidationResult(
            this DbEntityValidationException exception)
        {
            var result = new ValidationResult();
            foreach (var eve in exception.EntityValidationErrors)
            {
                result.AddError(eve.Entry.Entity.GetType().Name,
                    $"Entity of type {eve.Entry.Entity.GetType().Name} in state {eve.Entry.State}  has the following validation errors: ");

                foreach (var ve in eve.ValidationErrors)
                {
                    result.AddError(ve.PropertyName,
                        $"- Property: {ve.PropertyName}, Error: {ve.ErrorMessage}");
                }
            }
            return result;
        }
    }
}