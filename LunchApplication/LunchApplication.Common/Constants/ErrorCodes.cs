namespace LunchApplication.Common.Constants
{
    public static class ErrorCodes
    {
        //TODO: Change the Service Code as appropriate
        public const string ServiceCode = "SRV";
        public const string ErrorValidation = "0020";
        public const string ErrorValidationNullOrMalformed = "0021";

        public static string GetCode(string error)
        {
            // This can change to format errors any way we want
            return $"{ServiceCode}-{error}";
        }
    }
}