package chat.tamtam.botapi;

import java.util.List;

import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.CodegenParameter;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class Operation {
    public final String name;
    public final String doc;
    public final List<CodegenParameter> allParams;
    public final String returnType;
    public final String httpMethod;
    public final String path;
    public final CodegenParameter bodyParam;
    public final List<CodegenParameter> queryParams;
    public final boolean hasParams;
    public final boolean hasBodyParam;
    public final boolean hasQueryParams;

    Operation(CodegenOperation operation) {
        this.name = operation.nickname;
        this.doc = JsDocsBuilder.of(operation);
        this.allParams = operation.allParams;
        this.returnType = operation.returnType;
        this.httpMethod = operation.httpMethod;
        this.path = operation.path.replaceAll("\\{(.*?)}", "\\${$1}"); // /messages/{messageId} -> /messages/${messageId};
        this.bodyParam = operation.bodyParam;
        this.queryParams = operation.queryParams;
        this.hasQueryParams = operation.queryParams != null && !operation.queryParams.isEmpty();
        this.hasBodyParam = operation.bodyParam != null;
        this.hasParams = this.hasBodyParam || this.hasQueryParams;

        if (hasBodyParam) {
            allParams.stream()
                .filter(p -> bodyParam.paramName.equals(p.paramName))
                .forEach(p -> p.paramName = "data");

            bodyParam.paramName = "data";
        }
    }
}
