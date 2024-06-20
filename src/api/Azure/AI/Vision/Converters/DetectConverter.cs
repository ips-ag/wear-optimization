using Api.Azure.AI.Vision.Models;
using Api.Functions.Detect.Models;
using ErrorModel = Api.Functions.Detect.Models.ErrorModel;

namespace Api.Azure.AI.Vision.Converters;

public class DetectConverter
{
    public DetectResponseModel Convert(string imageName, ResponseModel model)
    {
        var response = new DetectResponseModel { ImageName = imageName };
        if (model.Error is not null)
        {
            response.Error = new ErrorModel { Code = model.Error.Code, Message = model.Error.Message };
        }
        if (model.CustomModelResult?.TagsResult?.Values.Count > 0)
        {
            var tagModel = model.CustomModelResult.TagsResult.Values.OrderByDescending(v => v.Confidence).First();
            response.Result = Convert(imageName, tagModel);
        }
        return response;
    }

    private ResultModel Convert(string imageName, TagModel model)
    {
        var wearCode = Convert(model.Name);
        string cause = GetCause(wearCode);
        var actions = GetSuggestedActions(wearCode);
        return new ResultModel
        {
            ImageName = imageName,
            WearCode = wearCode,
            WearConfidence = model.Confidence,
            WearCause = cause,
            SuggestedActions = actions
        };
    }

    private WearCode Convert(string model)
    {
        return model.ToLowerInvariant() switch
        {
            "plastic deformation" => WearCode.PlasticDeformation,
            "thermal cracking" => WearCode.ThermalCracking,
            "notch wear" => WearCode.NotchWear,
            "crater wear" => WearCode.CraterWear,
            "build-up on the cutting edge" => WearCode.BuildupOnCuttingEdge,
            "fractures" => WearCode.Fractures,
            "mould edge wear" => WearCode.MouldEdgeWear,
            "flank face wear" => WearCode.FlankFaceWear,
            "galling" => WearCode.Galling,
            _ => throw new ArgumentOutOfRangeException(nameof(model), model, $"Unknown wear code {model}")
        };
    }

    private string GetCause(WearCode code)
    {
        return code switch
        {
            WearCode.None => string.Empty,
            WearCode.BuildupOnCuttingEdge =>
                "Micro galling causes parts of the workpiece material to stick to the cutting edge, resulting in a build-up on the cutting edge",
            WearCode.FlankFaceWear =>
                "Flank face wear is caused by abrasion between the workpiece and the tool at the flank face of the indexable insert",
            WearCode.CraterWear => "Crater wear is caused by erosion and abrasion on the rake face",
            WearCode.Fractures =>
                "Fractures are caused by vibration, interrupted cuts, chip impacts and thermal shocks in combination with cutting tool material substrates that are too hard",
            WearCode.PlasticDeformation =>
                "Plastic deformation is caused by excessive heat development combined with excessive mechanical stress",
            WearCode.NotchWear =>
                "Notch wear often occurs during the machining of workpieces with a hard surface (forged or cast)",
            WearCode.ThermalCracking => "Thermal cracks are caused by fluctuations in temperature (thermal shock)",
            WearCode.Galling =>
                "Galling occurs due to unsuitable combinations of: tool surface types, workpiece material properties and coolant properties",
            WearCode.MouldEdgeWear => "Mold edge wear is caused by abrasion between the workpiece and the mold edges",
            _ => throw new ArgumentOutOfRangeException(nameof(code), code, $"No cause defined for wear code {code}")
        };
    }

    private List<string> GetSuggestedActions(WearCode code)
    {
        return code switch
        {
            WearCode.None => [],
            WearCode.BuildupOnCuttingEdge =>
            [
                "Increase cutting speed", "Use sharper indexable insert",
                "Use cutting tool material with a treated (smoother) surface",
                "Increase coolant pressure/check alignment"
            ],
            WearCode.FlankFaceWear =>
            [
                "Use more wear-resistant cutting tool material", "Increase feed rate", "Reduce cutting speed",
                "Increase coolant pressure/check alignment"
            ],
            WearCode.CraterWear =>
            [
                "Reduce cutting speed", "Use geometry with a greater rake angle",
                "Use more wear-resistant cutting tool material", "Reduce feed rate",
                "Increase coolant pressure/check alignment"
            ],
            WearCode.Fractures =>
            [
                "Reduce cutting speed", "Use a tougher cutting tool material", "Use a stronger cutting edge",
                "Check the tool stability if vibration occurs", "Reduce feed rate",
                "Turn off coolant supply when machining interrupted cuts"
            ],
            WearCode.PlasticDeformation =>
            [
                "Select a more wear-resistant cutting material", "Reduce the feed rate", "Reduce the cutting speed",
                "Reduce the cutting depth", "Increase the coolant pressure/check the alignment"
            ],
            WearCode.NotchWear =>
            [
                "Vary the cutting depth", "Reduce the cutting speed",
                "Use a tougher cutting tool material (PVD coated)",
                "Use a tool with a leading cutting edge (smaller approach angle)", "Select a smaller corner radius",
                "Increase the coolant pressure/check the alignment"
            ],
            WearCode.ThermalCracking =>
            [
                "Reduce cutting speed", "Reduce feed rate", "Use tougher cutting tool material",
                "Turn off coolant supply when machining interrupted cuts", "Use more stable geometry"
            ],
            WearCode.Galling =>
            [
                "Select a tool type with a higher clearance angle", "Select a suitable coating or surface treatment",
                "Improve the coolant supply and lubrication (e.g. increase the oil content or use tools with internal coolant)",
                "Reduce the cutting speed in order to reduce the temperature and thereby reduce the tendency to form build-up",
                "Ensure that the tool is free-cutting (high rake angle and helix angle, sharp cutting edges)"
            ],
            WearCode.MouldEdgeWear =>
            [
                "Improve the coolant supply and lubrication (e.g. increase the oil content or use tools with internal coolant)",
                "Vary the forming speed", "Modify the polygon geometry"
            ],
            _ => throw new ArgumentOutOfRangeException(nameof(code), code, $"No actions defined for wear code {code}")
        };
    }
}
