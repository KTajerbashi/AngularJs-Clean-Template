using Microsoft.AspNetCore.Mvc;

namespace AngularJs.EndPoint.WebApi.Controllers;

public class FileController : BaseController
{
    private readonly string _uploadPath;

    public FileController()
    {
        // مسیر ذخیره فایل‌ها در wwwroot/uploads
        _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

        if (!Directory.Exists(_uploadPath))
            Directory.CreateDirectory(_uploadPath);
    }

    // ✅ Upload file
    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest("فایل انتخاب نشده است.");

        var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(_uploadPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new
        {
            id = fileName,         // می‌توانید از فایل‌نیم بعنوان id استفاده کنید
            name = file.FileName,
            size = file.Length,
            url = $"/uploads/{fileName}"
        });
    }

    // ✅ Download file
    [HttpGet("download/{id}")]
    public IActionResult Download(string id)
    {
        var filePath = Path.Combine(_uploadPath, id);
        if (!System.IO.File.Exists(filePath))
            return NotFound("فایل یافت نشد.");

        var contentType = "application/octet-stream";
        var extension = Path.GetExtension(filePath).ToLower();

        // MIME type بر اساس پسوند
        if (extension == ".png") contentType = "image/png";
        else if (extension == ".jpg" || extension == ".jpeg") contentType = "image/jpeg";
        else if (extension == ".pdf") contentType = "application/pdf";
        else if (extension == ".txt") contentType = "text/plain";
        else if (extension == ".xls" || extension == ".xlsx") contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

        var fileBytes = System.IO.File.ReadAllBytes(filePath);
        return File(fileBytes, contentType, Path.GetFileName(filePath));
    }

    // ✅ Delete file
    [HttpDelete("delete/{id}")]
    public IActionResult Delete(string id)
    {
        var filePath = Path.Combine(_uploadPath, id);
        if (!System.IO.File.Exists(filePath))
            return NotFound("فایل یافت نشد.");

        System.IO.File.Delete(filePath);
        return Ok(new { message = "فایل حذف شد." });
    }
}
