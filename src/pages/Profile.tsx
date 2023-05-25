import React, { useEffect } from "react";
import { FormMultiSelect, Navbar } from "src/components/common";
import { ModalForm } from "src/components/common";
import ProfileRequest, { getProfile } from "src/requests/ProfileRequest";
import CategoryRequest, {
  GetCategoryResponseData,
} from "src/requests/CategoryRequest";
import SourceRequest, {
  GetSourceResponseData,
} from "src/requests/SourceRequest";
import AuthorRequest, {
  GetAuthorResponseData,
} from "src/requests/AuthorRequest";
import { FormInformation } from "src/components/common";
import {
  ModalOnSave,
  ModalSelectionData,
} from "src/components/common/modal_form";
import { PropsValue } from "react-select";
import { toast } from "react-toastify";
import SetPersonalizeRequest from "src/requests/PersonalizeRequest";

interface IProfilePageProps {}

interface IPreferencesData {
  sources: string[] | null;
  categories: string[] | null;
  authors: string[] | null;
}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const [token, setToken] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  // set preferences
  const [preferences, setPreferences] = React.useState<IPreferencesData>({
    sources: null,
    categories: null,
    authors: null,
  });

  // modal state
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [modalOptionData, setModalOptionData] = React.useState<any[] | []>([]);
  const [modalCallback, setModalCallback] = React.useState<ModalOnSave>(
    () => {}
  );
  const [modalDefaultValue, setModalDefaultValue] = React.useState<
    PropsValue<any>[] | null
  >(null);

  // References to the select components
  const [categories, setCategories] = React.useState<
    GetCategoryResponseData[] | []
  >([]);
  const [sources, setSources] = React.useState<GetSourceResponseData[] | []>(
    []
  );
  const [authors, setAuthors] = React.useState<GetAuthorResponseData[] | []>(
    []
  );

  // Option Data
  const [optionsCategories, setOptionsCategories] = React.useState<any[]>([]);
  const [optionsSources, setOptionsSources] = React.useState<any[]>([]);
  const [optionsAuthors, setOptionsAuthors] = React.useState<any[]>([]);

  // Selected values
  const [category, setCategory] = React.useState<PropsValue<any>[] | null>(
    null
  );
  const [source, setSource] = React.useState<PropsValue<any>[] | null>(null);
  const [author, setAuthor] = React.useState<PropsValue<any>[] | null>(null);

  useEffect(() => {
    document.body.classList.add("bg-gray-100");
    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  // token validation
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (!sessionToken) {
      window.location.href = "/login";
    } else {
      setToken(sessionToken!);
    }
  }, [isModalOpen]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const response = await CategoryRequest.getCategories();
      if (response.data) {
        setCategories(response.data);
      }
    };

    const loadSources = async () => {
      const response = await SourceRequest.getSources();
      if (response.data) {
        setSources(response.data);
      }
    };

    const loadAuthors = async () => {
      const response = await AuthorRequest.getAuthors();
      if (response.data) {
        setAuthors(response.data);
      }
    };

    loadCategories();
    loadSources();
    loadAuthors();
  }, []);

  useEffect(() => {
    if (categories) {
      const data = categories.map((e) => {
        return {
          value: e.id.toString(),
          label: e.name,
        };
      });
      setOptionsCategories(data);
      // set default category)
      setCategory(
        data.filter((val) => preferences.categories?.includes(val.label))
      );
    }
  }, [categories, preferences.categories]);

  useEffect(() => {
    if (sources) {
      const data = sources.map((e) => {
        return {
          value: e.id.toString(),
          label: e.name,
        };
      });
      setOptionsSources(data);
      // set default source
      setSource(data.filter((val) => preferences.sources?.includes(val.value)));
    }
  }, [sources, preferences.sources]);

  useEffect(() => {
    if (authors) {
      const data = authors.map((e) => {
        return {
          value: e.id.toString(),
          label: e.name,
        };
      });
      setOptionsAuthors(data);
      // set default author
      setAuthor(data.filter((val) => preferences.authors?.includes(val.label)));
    }
  }, [authors, preferences.authors]);

  const getProfile = async () => {
    const getProfileFromApi = await ProfileRequest.getProfile();
    setUsername(getProfileFromApi.data.username);
    setEmail(getProfileFromApi.data.email);
    setPreferences({
      sources: JSON.parse(getProfileFromApi.data.preferred_sources),
      authors: JSON.parse(getProfileFromApi.data.authors),
      categories: JSON.parse(getProfileFromApi.data.categories),
    });
  };

  const doSave = async (postData: any) => {
    const response = await SetPersonalizeRequest.setPersonalized(postData);

    if (response.data) {
      const responseBody = response.data;
      const userData = responseBody;

      sessionStorage.setItem("user", JSON.stringify(userData));
      toast.success("Personalize saved");
    } else
      toast.error(
        "Something went wrong, please try again later or contact administrator"
      );
  };

  return (
    <>
      <Navbar />
      <ModalForm
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        optionData={modalOptionData}
        onSave={modalCallback}
        selectDefaultValue={modalDefaultValue}
      />
      <div className="container mx-auto my-10 max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-bold text-gray-700 dark:text-white">
            My Profile
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Personal details.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <FormInformation title="Username" value={username} />
            <FormInformation title="Email" value={email} />
            <FormMultiSelect
              title="Preferred sources"
              data={source}
              setUpdate={() => {
                setModalOptionData(optionsSources);
                setModalCallback(() => {
                  return (selectedValue: ModalSelectionData[]) => {
                    doSave({
                      preferred_sources: selectedValue.map((e) => e.value),
                    });
                    setSource(selectedValue);
                    setModalOpen(false);
                  };
                });
                setModalDefaultValue(source);
                setModalOpen(true);
              }}
            />
            <FormMultiSelect
              title="Authors"
              data={author}
              setUpdate={() => {
                setModalOptionData(optionsAuthors);
                setModalCallback(() => {
                  return (selectedValue: ModalSelectionData[]) => {
                    doSave({
                      authors: selectedValue.map((e) => e.label),
                    });
                    setAuthor(selectedValue);
                    setModalOpen(false);
                  };
                });
                setModalDefaultValue(author);
                setModalOpen(true);
              }}
            />
            <FormMultiSelect
              title="Categories"
              data={category}
              setUpdate={() => {
                setModalOptionData(optionsCategories);
                setModalCallback(() => {
                  return (selectedValue: ModalSelectionData[]) => {
                    doSave({
                      categories: selectedValue.map((e) => e.label),
                    });
                    setCategory(selectedValue);
                    setModalOpen(false);
                  };
                });
                setModalDefaultValue(category);
                setModalOpen(true);
              }}
            />
          </dl>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
