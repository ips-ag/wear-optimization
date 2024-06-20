using System.Diagnostics.CodeAnalysis;
using Api.Azure.Storage.Models;
using Api.Functions.Detect.Models;

namespace Api.Azure.Storage.Converters;

public class WearCodeConverter
{
    [return: NotNullIfNotNull(nameof(wearCode))]
    public WearCodeModel? Convert(WearCode? wearCode)
    {
        if (wearCode is null) return null;
        return wearCode switch
        {
            WearCode.None => WearCodeModel.None,
            WearCode.BuildupOnCuttingEdge => WearCodeModel.BuildupOnCuttingEdge,
            WearCode.FlankFaceWear => WearCodeModel.FlankFaceWear,
            WearCode.CraterWear => WearCodeModel.CraterWear,
            WearCode.Fractures => WearCodeModel.Fractures,
            WearCode.PlasticDeformation => WearCodeModel.PlasticDeformation,
            WearCode.NotchWear => WearCodeModel.NotchWear,
            WearCode.ThermalCracking => WearCodeModel.ThermalCracking,
            WearCode.Galling => WearCodeModel.Galling,
            WearCode.MouldEdgeWear => WearCodeModel.MouldEdgeWear,
            _ => throw new ArgumentOutOfRangeException(nameof(wearCode), wearCode, "Unknown wear code")
        };
    }
}
