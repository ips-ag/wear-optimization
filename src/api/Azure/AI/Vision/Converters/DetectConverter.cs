using System.Diagnostics.CodeAnalysis;
using Api.Azure.AI.Vision.Models;
using Api.Functions.Detect.Models;
using ErrorModel = Api.Functions.Detect.Models.ErrorModel;

namespace Api.Azure.AI.Vision.Converters;

public class DetectConverter
{
    [return: NotNullIfNotNull(nameof(model))]
    public DetectResponseModel? Convert(ResponseModel? model)
    {
        if (model is null) return null;
        var response = new DetectResponseModel();
        if (model.Error is not null)
        {
            response.Error = new ErrorModel { Code = model.Error.Code, Message = model.Error.Message };
        }
        if (model.CustomModelResult?.TagsResult?.Values.Count > 0)
        {
            var tagModel = model.CustomModelResult.TagsResult.Values.OrderByDescending(v => v.Confidence).First();
            response.Result =
                Convert(tagModel);
        }
        return response;
    }

    private ResultModel Convert(TagModel model)
    {
        var wearCode = Convert(model.Name);
        string cause = GetCause(wearCode);
        var actions = GetSuggestedActions(wearCode);
        return new ResultModel
        {
            WearCode = wearCode, WearConfidence = model.Confidence, WearCause = cause, SuggestedActions = actions
        };
    }

    private WearCodeModel Convert(string model)
    {
        return model.ToLowerInvariant() switch
        {
            "plastic deformation" => WearCodeModel.PlasticDeformation,
            "thermal cracking" => WearCodeModel.ThermalCracking,
            "notch wear" => WearCodeModel.NotchWear,
            "crater wear" => WearCodeModel.CraterWear,
            "build-up on the cutting edge" => WearCodeModel.BuildupOnCuttingEdge,
            "fractures" => WearCodeModel.Fractures,
            "mould edge wear" => WearCodeModel.MouldEdgeWear,
            "flank face wear" => WearCodeModel.FlankFaceWear,
            "galling" => WearCodeModel.Galling,
            _ => throw new ArgumentOutOfRangeException(nameof(model), model, $"Unknown wear code {model}")
        };
    }

    private string GetCause(WearCodeModel code)
    {
        return code switch
        {
            WearCodeModel.None => string.Empty,
            WearCodeModel.BuildupOnCuttingEdge =>
                "Micro galling causes parts of the workpiece material to stick to the cutting edge, resulting in a build-up on the cutting edge",
            WearCodeModel.FlankFaceWear =>
                "Flank face wear is caused by abrasion between the workpiece and the tool at the flank face of the indexable insert",
            WearCodeModel.CraterWear => "Crater wear is caused by erosion and abrasion on the rake face",
            WearCodeModel.Fractures =>
                "Fractures are caused by vibration, interrupted cuts, chip impacts and thermal shocks in combination with cutting tool material substrates that are too hard",
            WearCodeModel.PlasticDeformation =>
                "Plastic deformation is caused by excessive heat development combined with excessive mechanical stress",
            WearCodeModel.NotchWear =>
                "Notch wear often occurs during the machining of workpieces with a hard surface (forged or cast)",
            WearCodeModel.ThermalCracking =>
                "Thermal cracks are caused by fluctuations in temperature (thermal shock)",
            WearCodeModel.Galling =>
                "Galling occurs due to unsuitable combinations of: tool surface types, workpiece material properties and coolant properties",
            WearCodeModel.MouldEdgeWear =>
                "Mold edge wear is caused by abrasion between the workpiece and the mold edges",
            _ => throw new ArgumentOutOfRangeException(nameof(code), code, $"No cause defined for wear code {code}")
        };
    }

    private List<string> GetSuggestedActions(WearCodeModel code)
    {
        return code switch
        {
            WearCodeModel.None => [],
            WearCodeModel.BuildupOnCuttingEdge =>
            [
                "Increase cutting speed", "Use sharper indexable insert",
                "Use cutting tool material with a treated (smoother) surface",
                "Increase coolant pressure/check alignment"
            ],
            WearCodeModel.FlankFaceWear =>
            [
                "Use more wear-resistant cutting tool material", "Increase feed rate", "Reduce cutting speed",
                "Increase coolant pressure/check alignment"
            ],
            WearCodeModel.CraterWear =>
            [
                "Reduce cutting speed", "Use geometry with a greater rake angle",
                "Use more wear-resistant cutting tool material", "Reduce feed rate",
                "Increase coolant pressure/check alignment"
            ],
            WearCodeModel.Fractures =>
            [
                "Reduce cutting speed", "Use a tougher cutting tool material", "Use a stronger cutting edge",
                "Check the tool stability if vibration occurs", "Reduce feed rate",
                "Turn off coolant supply when machining interrupted cuts"
            ],
            WearCodeModel.PlasticDeformation =>
            [
                "Select a more wear-resistant cutting material", "Reduce the feed rate", "Reduce the cutting speed",
                "Reduce the cutting depth", "Increase the coolant pressure/check the alignment"
            ],
            WearCodeModel.NotchWear =>
            [
                "Vary the cutting depth", "Reduce the cutting speed",
                "Use a tougher cutting tool material (PVD coated)",
                "Use a tool with a leading cutting edge (smaller approach angle)", "Select a smaller corner radius",
                "Increase the coolant pressure/check the alignment"
            ],
            WearCodeModel.ThermalCracking =>
            [
                "Reduce cutting speed", "Reduce feed rate", "Use tougher cutting tool material",
                "Turn off coolant supply when machining interrupted cuts", "Use more stable geometry"
            ],
            WearCodeModel.Galling =>
            [
                "Select a tool type with a higher clearance angle", "Select a suitable coating or surface treatment",
                "Improve the coolant supply and lubrication (e.g. increase the oil content or use tools with internal coolant)",
                "Reduce the cutting speed in order to reduce the temperature and thereby reduce the tendency to form build-up",
                "Ensure that the tool is free-cutting (high rake angle and helix angle, sharp cutting edges)"
            ],
            WearCodeModel.MouldEdgeWear =>
            [
                "Improve the coolant supply and lubrication (e.g. increase the oil content or use tools with internal coolant)",
                "Vary the forming speed", "Modify the polygon geometry"
            ],
            _ => throw new ArgumentOutOfRangeException(nameof(code), code, $"No actions defined for wear code {code}")
        };
    }
}
