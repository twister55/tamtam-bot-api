package chat.tamtam.botapi;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

import org.openapitools.codegen.CodegenConstants.ENUM_PROPERTY_NAMING_TYPE;
import org.openapitools.codegen.CodegenModel;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.SupportingFile;
import org.openapitools.codegen.languages.AbstractTypeScriptClientCodegen;

/**
 * @author <a href="mailto:vadim.yelisseyev@gmail.com">Vadim Yelisseyev</a>
 */
public class TypescriptClientCodegen extends AbstractTypeScriptClientCodegen {

    public TypescriptClientCodegen() {
        this.embeddedTemplateDir = getName();
        this.templateDir = getName();
        this.apiPackage = "src";
        this.modelPackage = "src/types";
        this.outputFolder = "generated-code/tamtam-bot-api";
    }

    @Override
    public String getName() {
        return "tamtam-bot-api-typescript";
    }

    @Override
    public String getHelp() {
        return "Generates a TypeScript client library for TamTam Bot API.";
    }

    @Override
    public void processOpts() {
        setEnumPropertyNaming(ENUM_PROPERTY_NAMING_TYPE.UPPERCASE.name());

        supportingFiles.add(new SupportingFile("api.mustache", "src", "api.ts"));
        supportingFiles.add(new SupportingFile("types.mustache", "src", "types.ts"));
    }

    @Override
    public String toTypescriptTypeName(String name, String safePrefix) {
        if ("Error".equals(name)) {
            return "RequestError";
        }

        return super.toTypescriptTypeName(name, safePrefix);
    }

    @Override
    public Map<String, Object> postProcessSupportingFileData(Map<String, Object> data) {
        postProcessAPI(data);
        postProcessTypes(data);

        return data;
    }

    @SuppressWarnings("unchecked")
    private void postProcessAPI(Map<String, Object> data) {
        final Map<String, Object> api = (Map<String, Object>) data.remove("apiInfo");
        final List<Map<String, Object>> apis = (List<Map<String, Object>>) api.remove("apis");

        api.put("imports", String.join(", ", collectImports(apis)));
        api.put("operations", collectOperations(apis));

        data.put("api", api);
    }

    @SuppressWarnings("unchecked")
    private Set<String> collectImports(List<Map<String, Object>> apis) {
        return apis.stream()
            .map((api) -> (List<Map<String, String>>) api.get("imports"))
            .flatMap(List::stream)
            .map(item -> item.get("classname"))
            .collect(Collectors.toCollection(TreeSet::new));
    }

    @SuppressWarnings("unchecked")
    private List<Operation> collectOperations(List<Map<String, Object>> apis) {
        return apis.stream()
            .map(api -> (Map<String, Object>) api.get("operations"))
            .map(operations -> (List<CodegenOperation>) operations.get("operation"))
            .flatMap(List::stream)
            .map(Operation::new)
            .collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private void postProcessTypes(Map<String, Object> data) {
        final List<Map<String, Object>> models = (List<Map<String, Object>>) data.remove("models");

        data.put("types", collectTypes(models));
    }

    private List<Type> collectTypes(List<Map<String, Object>> models) {
        return models.stream()
            .map(api -> (CodegenModel) api.get("model"))
            .filter(model -> !model.name.endsWith("_allOf"))
            .map(Type::new)
            .collect(Collectors.toList());
    }
}
